#!/usr/bin/expect

set timeout 2000

spawn zip -r ExamManagement.zip ./ExamManagement

spawn scp -r ./ExamManagement root@139.159.201.22:/root/www

spawn unzip /root/www/ExamManagement

spawn rm /root/www/ExamManagement.zip

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
