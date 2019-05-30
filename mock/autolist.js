import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i <4; i += 1) {
  tableListDataSource.push({
    key: i,
    avatar: [
        'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
        'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
        'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
        'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
    ][i % 4],
    title: [
      '图像分类', 
      '物体检测', 
      '预测分析', 
      '声音分类', 
    ][i % 4],
    img: [
      'https://console.huaweicloud.com/modelarts/theme/default/images/autoML/aaa.svg', 
      'https://console.huaweicloud.com/modelarts/theme/default/images/autoML/object_detection.svg', 
      'https://console.huaweicloud.com/modelarts/theme/default/images/autoML/prediction_analysis.svg', 
      'https://console.huaweicloud.com/modelarts/theme/default/images/autoML/audio_detection.png', 
    ][i % 4],
    desc: [
      '识别一张图片中是否包含某种物体。', 
      '识别出图片中每个物体的位置及类别。', 
      '对结构化数据做出分类或数值预测。', 
      '识别一段音频中是否包含某种声音。', 
    ][i % 4],

  });
}

function getAutoList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
  };

  return res.json(result.list);
}

function postAutoList(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        disabled: i % 6 === 0,
        href: 'https://ant.design',
        avatar: [
          'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ][i % 2],
        name: `task ${i}`,
        type: `任务类型 ${i}`,
        owner: 'zhaozheng',
        desc: '这是一段描述',
        sourcedata:`/home/ap/data ${i}`,
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 4,
        updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
        createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
        progress: Math.ceil(Math.random() * 100),
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.key === key) {
          Object.assign(item, { desc, name });
          return item;
        }
        return item;
      });
      break;
    default:
      break;
  }

  return getAutoList(req, res, u);
}

export default {
  'GET /api/auto_list': getAutoList,
  'POST /api/auto_list': postAutoList,
};
