#!/usr/bin/expect -f
set timeout 30
scp -r "../${siteSource}/." server@139.159.201.22:/root/www/ExamManagement
expect "*password:"
send "123loveyou,\r"
expect eof
