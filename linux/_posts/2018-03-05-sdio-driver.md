---
layout: post
tags: driver sdio
---
* content
{:toc}

Initializing
============
* SD Host's initializing starts from [te4395_sdhci_probe()](#te4395_sdhci_probe).
* SDIO card's initializing starts from [sdhci_irq()](#sdhci_irq).

Call tree
============

drivers/mmc/host/sdhci-te4395.c
-------------------------------

### te4395_sdhci_probe()

```cpp
static int te4395_sdhci_probe(struct platform_device *pdev)
{
...
	host = sdhci_pltfm_init(pdev, &te4395_sdhci_pdata, sizeof(*te4395_host));
...
	if ((ret = sdhci_add_host(host)) < 0)
		goto err
...
```

drivers/mmc/host/sdhci-pltfm.c
------------------------------

### sdhci_pltfm_init()

```cpp
struct sdhci_host *sdhci_pltfm_init(struct platform_device *pdev,
			const struct sdhci_pltfm_data *pdata,
			size_t priv_size)
{
...
	host = sdhci_alloc_host(&pdev->dev,
			sizeof(struct sdhci_pltfm_host) + priv_size);
```

drivers/mmc/core/host.c
-----------------------
### mmc_alloc_host()
```cpp
struct mmc_host *mmc_alloc_host(int extra, struct device *dev)
{
...
	INIT_DELAYED_WORK(&host->detect, mmc_rescan);
	INIT_DELAYED_WORK(&host->sdio_irq_work, sdio_irq_work);
...
```

drivers/mmc/core/core.c
-----------------------
### mmc_rescan()
```cpp
static const unsigned freqs[] = { 400000, 300000, 200000, 100000 };
...
void mmc_rescan(struct work_struct *work)
{
...
	for (i = 0; i < ARRAY_SIZE(freqs); i++) {
		if (!mmc_rescan_try_freq(host, max(freqs[i], host->f_min)))
...
```
then [mmc_rescan_try_freq()](#mmc_rescan_try_freq)

### mmc_rescan_try_freq()
```cpp
static int mmc_rescan_try_freq(struct mmc_host *host, unsigned freq)
{
...
	mmc_power_up(host, host->ocr_avail);

	mmc_go_idle(host);

	mmc_send_if_cond(host, host->ocr_avail);

	if (!mmc_attach_sdio(host))
		return 0;

	if (!mmc_attach_sd(host))
		return 0;

	if (!mmc_attach_mmc(host))
		return 0;

	mmc_power_off(host);
	return -EIO;
}
```

### mmc_detect_change()
```cpp
void mmc_detect_change(struct mmc_host *host, unsigned long delay)
{
    _mmc_detect_change(host, delay, true);
}
...
static void _mmc_detect_change(struct mmc_host *host, unsigned long delay,
                bool cd_irq)
{
...
	mmc_schedule_delayed_work(&host->detect, delay);
}
```
goto delayed work [mmc_rescan()](#mmc_rescan) accroding to [mmc_alloc_host()](#mmc_alloc_host)


drivers/mmc/core/sdio.c
-----------------------

### mmc_attach_sdio()
```cpp
int mmc_attach_sdio(struct mmc_host *host)
{
...
	err = mmc_send_io_op_cond(host, 0, &ocr);
	rocr = mmc_select_voltage(host, ocr);
	err = mmc_sdio_init_card(host, rocr, NULL, 0);
...
}

```

drivers/mmc/host/sdhci.c
-----------------------

### sdhci_irq()
```cpp
static irqreturn_t sdhci_irq(int irq, void *dev_id)
{
...
	if (intmask & (SDHCI_INT_CARD_INSERT | SDHCI_INT_CARD_REMOVE)) {
		...
		host->thread_isr |= intmask & (SDHCI_INT_CARD_INSERT |
			SDHCI_INT_CARD_REMOVE);
		result = IRQ_WAKE_THREAD;
	}
...
}
```
return IRQ_WAKE_THREAD, so [sdhci_thread_irq()](#sdhci_thread_irq) is executed.

### sdhci_thread_irq()
```cpp
static irqreturn_t sdhci_thread_irq(int irq, void *dev_id)
{
...
	if (isr & (SDHCI_INT_CARD_INSERT | SDHCI_INT_CARD_REMOVE)) {
		struct mmc_host *mmc = host->mmc;
		mmc_detect_change(mmc, msecs_to_jiffies(200));
	}

```
when card's insert and remove interrupt occurs, call [mmc_detect_change()](#mmc_detect_change)

### sdhci_alloc_host()

```cpp
struct sdhci_host *sdhci_alloc_host(struct device *dev,
	size_t priv_size)
{
...
	mmc = mmc_alloc_host(sizeof(struct sdhci_host) + priv_size, dev);
...
}
```

### sdhci_add_host()

```cpp
int sdhci_add_host(struct sdhci_host *host)
{
...
	ret = sdhci_setup_host(host);

	ret = __sdhci_add_host(host);
```
in sdhci_setup_host(), setting clk, power, etc. accroding caps...

###  __sdhci_add_host()

```cpp
int __sdhci_add_host(struct sdhci_host *host)
{
...
	tasklet_init(&host->finish_tasklet,
        sdhci_tasklet_finish, (unsigned long)host);
	
	timer_setup(&host->timer, sdhci_timeout_timer, 0);
	timer_setup(&host->data_timer, sdhci_timeout_data_timer, 0);

	init_waitqueue_head(&host->buf_ready_int);
	
	ret = request_threaded_irq(host->irq, sdhci_irq, sdhci_thread_irq,
	                   IRQF_SHARED, mmc_hostname(mmc), host);
...
}
```
