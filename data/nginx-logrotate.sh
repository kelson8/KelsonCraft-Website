#!/bin/bash

# https://alexanderzeitler.com/articles/rotating-nginx-logs-with-docker-compose/
# https://linuxvox.com/blog/linux-cat-eof/

# This will be a basic script to setup log rotation with Nginx.
# Switched to copying directly into the container.

$LOG_ROTATE_FILE=/etc/logrotate.d/nginx

# touch $LOG_ROTATE_FILE

# if [ -f "$LOG_ROTATE_FILE" ]; then
cat << EOF > $LOG_ROTATE_FILE
#!/bin/bash
/var/opt/deploy/logs/*.log {
  daily
  missingok
  rotate 31
  dateext
  compress
  delaycompress
  notifempty
  sharedscripts
  postrotate
    cd /var/opt/deploy \
      && /usr//bin/docker compose kill -s USR1 nginx
  endscript
}
EOF  

# fi