## 微信小程序开发-豆瓣

### 使用到的豆瓣Api

  如果`api.douban.com`报错403，可以把地址改为`douban.uieee.com`


#### Top250
  url: https://douban.uieee.com/v2/movie/top250
  参数：
    + apikey: 固定值：0b2bdeda43b5688921839c8ecb20399b
    + city: 所在城市，例如上海，北京等
    + start：分页使用，表示第几页
    + count：分页使用，表示数量
    + client：客户端信息，可为空
    + udid：用户id，可为空

#### 正在上映
  url: https://api.douban.com/v2/movie/in_theaters,
  参数同上

#### 即将上映
  url： http://douban.uieee.com/v2/movie/coming
  参数同上

#### 新片排行榜
  url： http://douban.uieee.com/v2/movie/new_movies，
  参数同上