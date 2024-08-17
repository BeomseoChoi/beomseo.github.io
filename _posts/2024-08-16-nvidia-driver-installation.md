---
layout: default
title:  "Nvidia Driver Installation"
date:   2024-08-16 21:22:53 +0900
categories: post
---
{% include post-header.html %}

Check your GPUs
```
lshw -C display
```
```c++
#include <iostream>

int main(){
    std::printf("hello, world!\n");
}
```


Check driver versions
```
ubuntu-drivers devices
```

Install Nvidia driver on specific version
```
sudo apt install nvidia-driver-<version you want to install>
```

Reboot
```
sudo reboot
```

Check if this is working well
```
nvidia-smi
```
