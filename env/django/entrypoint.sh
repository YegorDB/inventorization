#!/bin/bash

# while true;
# do
#     sleep 60
# done

until python manage.py inspectdb &> /dev/null
do
    echo "Waiting for DB ..."
    sleep 5
done
echo "DB has been initialized!"

python manage.py migrate;
python manage.py collectstatic --noinput;

if [ "${DEVELOPMENT}" ]; then
	python manage.py runserver 0.0.0.0:8000;
fi
