# ───── 2단계: Nginx 런타임 ─────
FROM nginx:1.27-alpine

# 우리 커스텀 설정
COPY nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm /etc/nginx/conf.d/default.conf   # 기본 conf 제거(로그 노이즈 차단)

# 빌드 산출물 배포
COPY dist/public /etc/nginx/public


EXPOSE 9004
CMD ["nginx", "-g", "daemon off;"]
