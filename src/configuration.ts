import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@modules.services/framework';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';

// ! config
import * as DefaultConfig from './config/config.default'
import * as UnittestConfig from './config/config.unittest'

// ! filter
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';

// ! middleware
import { ReportMiddleware } from './middleware/report.middleware';

@Configuration({
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [
    {
      default: DefaultConfig,
      test: UnittestConfig,
    }
  ],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
