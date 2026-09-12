# syntax=docker/dockerfile:1

FROM node:24-alpine AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable
WORKDIR /repo

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/
COPY packages/contracts/package.json packages/contracts/
COPY packages/db/package.json packages/db/
COPY packages/typescript-config/package.json packages/typescript-config/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --filter api... --filter @repo/db...

FROM deps AS build
COPY packages/ packages/
COPY apps/api/ apps/api/
RUN pnpm --filter @repo/contracts --filter @repo/db build \
    && pnpm --filter api build

# Only the API's production dependency graph ships in the final image.
FROM build AS prune
RUN pnpm --filter api --prod --legacy deploy /out \
    && cp -r apps/api/dist /out/dist

FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=prune /out/node_modules ./node_modules
COPY --from=prune /out/dist ./dist
COPY --from=prune /out/package.json ./package.json
USER node
EXPOSE 4000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||4000)+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "dist/main.js"]
