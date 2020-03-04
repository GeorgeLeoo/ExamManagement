#!/usr/bin/expect

set -e

# 打印当前的工作路径
pwd

set timeout 30

scp "../${siteSource}/." root@139.159.201.22:/root/www/ExamManagement

expect "password:"

send "123loveyou,\r"

interact
