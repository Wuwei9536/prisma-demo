# prisma demo


## 开始

```bash
# 启动mysql 服务
docker-compose up -d
```

## 启动业务

```bash
npm i
npm start
```

## 结束

```bash
# 关闭mysql服务
docker-compose down
```


## 启动生产环境


```bash
npm run debug
```

## 目录介绍

* `src`: 开发入口
  * `main.js`: 服务总入口
  * `prisma` :prisma配置
    * `datamodel.prisma`: prisma model 对应数据表的模型定义
    * `prisma.yml`: prisma 配置文件
  * `resolves`: graphQL解析器
    * `[PROJECTNAME]`: 各自业务模块开发入口
  * `schema.graphql`:graphQL API model
* `dist`:  项目打包后内容 **[gitignore]**
* `docker-compose.yml`: docker配置

## 技术栈

| 名称          | Github | 中文API | 英文API |
| ------------- | ------ | ------- | ------- |
| GraphQL       |        |         |         |
| prisma        |        |         |         |