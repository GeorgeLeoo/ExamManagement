#!/usr/bin/expect

set timeout 10

spawn scp -r ./dist root@139.159.201.22:/root/www/ExamManagement

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
