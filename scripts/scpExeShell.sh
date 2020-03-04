#!/usr/bin/expect

set timeout 120

spawn scp -r  "../${siteSource}/." root@139.159.201.22:/root/www/ExamManagement

expect {

        "yes/no" {exec sleep 1

                  send "yes\r"; exp_continue}

        password: {exec sleep 5

                 send "123loveyou,\r" ; exp_continue}

        eof exit

}
