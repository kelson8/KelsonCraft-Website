#!/bin/bash

# Basic bash script to view the list of IPs that have most accessed this Nginx instance.
# https://oneuptime.com/blog/post/2026-03-20-parse-ipv4-addresses-nginx-access-logs/view

# https://www.baeldung.com/linux/use-command-line-arguments-in-bash-script

# To use this script:
# Argument 1 is the log file to view the IPs from.
# Argument 2 is the amount of IPs to view in the logs.

LOG_FILE="$1"
IPS_TO_VIEW="$2"

if [ ! "$LOG_FILE" ] || [ ! "$IPS_TO_VIEW" ]; then
    echo "Script usage: ./most-accessed-ips.sh logfile.log amountOfIps"
    exit 1
fi

# https://stackoverflow.com/questions/806906/how-do-i-test-if-a-variable-is-a-number-in-bash

# Check if number is valid with regex.
re='^[0-9]+$'

if ! [[ "$IPS_TO_VIEW" =~ $re ]]; then
    echo "$IPS_TO_VIEW is not a valid number!"
    exit 1
fi

if [ ! -f "$LOG_FILE" ]; then
    echo "$LOG_FILE doesn't exist!"
    exit 1
fi


awk '{print $1}' "$LOG_FILE" | sort | uniq -c | sort -rn | head "-$IPS_TO_VIEW"
