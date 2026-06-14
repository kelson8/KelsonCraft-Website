#!/bin/bash

# This should sync the Cloudflare IPs to the /etc/nginx/cloudflare file in the Nginx container once I set it up.
# https://github.com/ergin/nginx-cloudflare-real-ip/blob/master/cloudflare-sync-ips.sh

# This works, I used a Linux terminal to manually generate the file for now.
# TODO Make this work in the docker container.

CLOUDFLARE_FILE_PATH=${1:-/etc/nginx/cloudflare}

# This should just error out if the file already exists.
if [ -f "$CLOUDFLARE_FILE_PATH" ]; then
#  echo "File already exists, would you like to overwrite it?"
  echo "File already exists! Not overwriting it"
  exit 1
fi

echo "#Cloudflare" > "$CLOUDFLARE_FILE_PATH";
echo "" >> "$CLOUDFLARE_FILE_PATH";

echo "# - IPv4" >> "$CLOUDFLARE_FILE_PATH";
for i in `curl -s -L https://www.cloudflare.com/ips-v4`; do
        echo "set_real_ip_from $i;" >> "$CLOUDFLARE_FILE_PATH";
done

echo "" >> "$CLOUDFLARE_FILE_PATH";
echo "# - IPv6" >> "$CLOUDFLARE_FILE_PATH";
for i in `curl -s -L https://www.cloudflare.com/ips-v6`; do
        echo "set_real_ip_from $i;" >> "$CLOUDFLARE_FILE_PATH";
done

echo "" >> "$CLOUDFLARE_FILE_PATH";
echo "real_ip_header CF-Connecting-IP;" >> "$CLOUDFLARE_FILE_PATH";

#test configuration and reload nginx
#nginx -t && systemctl reload nginx
