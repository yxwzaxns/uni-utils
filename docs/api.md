---
title: "API Documents"
description: ""
---

# API Documents

## Core
- Remove duplicate elements in the array
```
removeDuplicate([Object])
# [1,2,3,2] -> [1,2,3]
```

- remove elem(s) on a array 
```
arrayRemove(Array,...elem)
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
- do something for time interval, similar to setInterval()
```
async countdown(Number: n, CallBack: func=console.log)
```
- sleep function
```
async sleep(Number :n)
# The amount of time, in milliseconds, to sleep.
```

- get timestamp in seconds
```
getTimeStamp()
```

- get today Date format : YY-MM-DD
```
getTodayDate()
```

## Path
-
```
homedir()
```
