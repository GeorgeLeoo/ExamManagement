#!/usr/bin/expect

set timeout 200

spawn zip -r ExamManagement.zip ./ExamManagement

spawn scp ./ExamManagement.zip root@139.159.201.22:/root/www

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

spawn ssh root@139.159.201.22

expect "password"
send "123loveyou,\n"
expect "GeorgeLeeo"

spawn jar xvf /root/www/ExamManagement.zip
expect eof
