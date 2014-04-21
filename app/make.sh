#!/bin/bash

find . -name "*.ts" | xargs tsc --module amd --target ES5 -w 
