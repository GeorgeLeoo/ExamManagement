#!/usr/bin/expect

set timeout 30

spawn scp "../${siteSource}/." root@139.159.201.22:/root/www/ExamManagement

expect "password:"

send "123loveyou,\r"

interact
