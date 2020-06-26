# bijianing.github.io
personal memo


# setup jekyll

```
sudo apt-get install ruby-full build-essential zlib1g-dev

echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

gem install jekyll bundler

git clone https://github.com/bijianing/bijianing.github.io.git
cd bijianing.github.io
bundler install
```


# setup systemd service

```
cd _jekyll_service
make install
```

