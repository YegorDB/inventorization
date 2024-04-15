FROM python:3.12.3

ADD ./requirements.txt /tmp/requirements.txt
RUN pip install --upgrade pip && \
	pip install --no-cache-dir -r /tmp/requirements.txt

COPY ./entrypoint.sh /usr/local/bin/

WORKDIR /app

ENTRYPOINT ["entrypoint.sh"]

EXPOSE 8000
