FROM mysql:8.0.32-debian

COPY ./my.cnf /etc/mysql/conf.d/my.cnf
COPY ./initdb.d /docker-entrypoint-initdb.d

# 日本語環境を追加
RUN apt-get update \
  && apt-get install -y locales \
  && localedef -f UTF-8 -i ja_JP ja_JP.UTF-8

CMD ["mysqld"]