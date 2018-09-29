ARG BUILD_FROM=alpine:3.8
# hadolint ignore=DL3006
FROM ${BUILD_FROM}

WORKDIR /usr/src/app

# Copy source files
COPY . .

# Install packages
RUN \
    apk add --no-cache \
     nodejs-current=9.11.1-r2 \
     yarn=1.7.0-r0

# Create nginx directories
RUN mkdir -p /run/nginx && mkdir -p /usr/share/nginx/html

# Install dependencies
RUN yarn install && yarn cache clean

# Expose outbound ports
EXPOSE 8080

# Build arguments
ARG BUILD_ARCH
ARG BUILD_DATE
ARG BUILD_REF
ARG BUILD_VERSION

# Labels
LABEL \
    maintainer="Timmo <contact@timmo.xyz>" \
    org.label-schema.description="Websocket for Quiz App" \
    org.label-schema.build-date=${BUILD_DATE} \
    org.label-schema.name="Quiz Websocket" \
    org.label-schema.schema-version="1.0" \
    org.label-schema.url="https://git.timmo.xyz/home-panel" \
    org.label-schema.usage="https://github.com/timmo001/home-panel/tree/master/README.md" \
    org.label-schema.vcs-ref=${BUILD_REF} \
    org.label-schema.vcs-url="https://github.com/timmo001/home-panel" \
    org.label-schema.vendor="Timmo"

# Set run CMD
CMD \
    echo "" \
    && echo "Copy certs if provided.." \
    && if [ "x$CERTIFICATES_DIR" = "x" ]; then echo "No certificates directory provided"; else cp ${CERTIFICATES_DIR}/* ./ ; fi \
    && echo "Run app.." \
    && node index.js
