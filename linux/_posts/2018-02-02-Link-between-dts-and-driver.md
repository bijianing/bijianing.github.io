---
layout:     post
title:      Link between dts and driver 
date:       2018-02-02 14:08:00 +0900
tags:       DTS Kernel Driver

---

* content
{:toc}


## clkドライバーの中で、：

```cpp
static void __init gates_setup(struct device_node *node)
{
    ①clk_data = clk_register_gate(...
    ②of_clk_add_provider(node, of_clk_src_simple_get, clk_data);
...
}
③CLK_OF_DECLARE(gate_sd_clk, "company,chip-name", gates_setup);
```

①：ドライバー関連データを作成

②：①で作成したドライバー関連データをstruct device_nodeと関連付けする
ドライバーデータとstruct device_nodeをグローバルリストに登録する。

③：OFテーブル定義、起動時、gates_setup()が実行されるようになる。

※ここでは、②が一番重要だ。

他のドライバーがclkを使いたい場合、DTSに書いてあるphandleを取得して、上記②で登録していたリストを検索すればよいとのことです。

例：
```cpp
 struct clk *__of_clk_get_from_provider(struct of_phandle_args *clkspec,
                       const char *dev_id, const char *con_id)
{
...
    list_for_each_entry(provider, &of_clk_providers, link) {
        if (provider->node == clkspec->np) {
            hw = __of_clk_get_hw_from_provider(provider, clkspec);
            clk = __clk_create_clk(hw, dev_id, con_id);
        }
...
    return clk;
}
```

