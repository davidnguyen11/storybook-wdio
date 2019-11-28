import { VisualRegressionTest } from '../../../../lib/test/visual-regression-test';
import * as style from '../style.less';

new VisualRegressionTest( __dirname, style.container).run();
