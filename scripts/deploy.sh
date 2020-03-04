#!/usr/bin/expect

# 打印当前的工作路径
#pwd
#
#set timeout 30
#
#spawn scp "../dist/." root@139.159.201.22:/root/www/ExamManagement
#
#expect "password:"
#
#send "123loveyou,\r"
#
#interact

set timeout 10

spawn scp "../dist/." root@139.159.201.22:/root/www/ExamManagement

 expect {

 "(yes/no)?" {
    send "yes\n"
    expect "*assword:" { send "123loveyou,\n"}
  }

 "*assword:" {
    send "123loveyou,\n"
  }
}

expect "100%"

expect eof
