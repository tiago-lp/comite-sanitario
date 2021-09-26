
FROM python:3.9-slim
RUN apt-get update && apt-get install -y gcc g++ musl-dev libxml2-dev libxslt-dev gettext
ENV APP_HOME /app
WORKDIR $APP_HOME

ENV PYTHONUNBUFFERED 1

# Install dependencies
COPY requirements/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy local code to the container image.
COPY . .

CMD exec gunicorn --bind 0.0.0.0:$PORT --workers 1 --threads 8 --timeout 0 comite_api.wsgi:application
