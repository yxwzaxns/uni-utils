---
title: "API Documents"
description: ""
---

# API Documents

## Core
-
```
removeDuplicate([Object])
# [1,2,3,2] -> [1,2,3]
```
-
```
async loopTask([Object]: list, func: callback, Object:opts) -> []
# opts = {execLength:10,timeGap:1000}
# callback = async (e)=>{} -> Object
```

## Dir

## File

## Network

## Process

## Time
-
```
async countdown(Number: n)
```
-
```
async sleep(Number :n)
# The amount of time, in milliseconds, to sleep.
```

## Path
-
```
homedir()
```
