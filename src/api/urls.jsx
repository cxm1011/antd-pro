/*
* 用于统一管理域名
*/
import {User, PersonalCenter} from './routers' // 第一步：导入


// 判断当前是否处于开发环境
const _DEV_ = (process.env.NODE_ENV || 'development') === 'development';
// 判断当前是否处于测试环境
// const _STG_ = (process.env.NODE_ENV || 'staging') === 'staging';
// 判断当前是否处于生产环境
const _PRD_ = (process.env.NODE_ENV || 'production') === 'production';

const urlModules = [User, PersonalCenter]; // 第二步：将导入模块引入

function initHostname() {
	if (_DEV_) {
		// 用于本地开发测试
		return {
			domainName: `http://localhost:8080/mock`,
			suffix: '.json',
			// mock数据中间地址
			mockAdd: '',
			userUrl: '',
		}
	}
	if (_PRD_) {
		// 用于生产环境
		return {
			domainName: ``,
			suffix: '',
			// mock数据中间地址
			mockAdd: '',
			userUrl: '',
		}
	}
}

// 初始化域名
const hostname = initHostname();
const urls = {}

urlModules.map((v) => {
	Object
    .keys(v)
    .forEach(function (key) {
    urls[key] = `${hostname.domainName}${v[key]}${hostname.suffix}`
  })
})

export default urls
