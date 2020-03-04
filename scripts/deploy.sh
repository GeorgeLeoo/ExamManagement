#!/usr/local/bin/expect -f

set -e

# 打印当前的工作路径
pwd

set timeout 30

spawn scp "../${siteSource}/." root@139.159.201.22:/root/www/ExamManagement

expect "password:"

send "123loveyou,\r"

interact
