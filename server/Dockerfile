FROM centos:centos6.8
LABEL authors="Sachin Vashist"

WORKDIR /root/sachin

RUN yum clean all
RUN yum install epel-release -y
RUN yum update -y
RUN yum install sshpass -y

RUN yum -y groupinstall "Development Tools"
RUN yum clean all
RUN curl --silent --location https://rpm.nodesource.com/setup_10.x | bash -
RUN yum -y install nodejs
RUN yum groupinstall 'Development Tools' -y
RUN yum install wget vim screen ImageMagick -y
RUN mkdir -p /root/sachin
COPY . /root/sachin
RUN cd /root/sachin; npm install; npm install loopback -g; npm install pm2 -g
RUN echo "/bin/bash /root/sachin/setup_server.sh" >> /root/.bashrc
EXPOSE 3000

CMD /root/sachin/setup_server.sh
