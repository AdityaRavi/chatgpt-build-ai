FROM python:3.10-slim-buster

ENV USER=dev
ENV UID=1000
ENV GID=1000

RUN apt-get -y update && apt-get -y install curl bzip2
# download and install conda
RUN curl -o Miniconda3-latest-Linux-x86_64.sh -L https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh && \
  bash Miniconda3-latest-Linux-x86_64.sh -b -p /opt/conda && \
  rm Miniconda3-latest-Linux-x86_64.sh

# add conda to the path
ENV PATH="/opt/conda/bin:$PATH"

RUN conda init bash
RUN conda create --name tf python=3.10
RUN /bin/bash -c "source /opt/conda/etc/profile.d/conda.sh && conda deactivate && conda activate tf"

RUN pip install --upgrade pip

WORKDIR /usr/src/app
COPY requirements.txt ./
RUN /bin/bash -c "pip install --no-cache-dir -r requirements.txt"

RUN groupadd -g 1000 -o dev \
  && useradd --uid 1000 --home-dir /home/dev -m -k /etc/skel -g 1000 dev
USER dev

COPY . .