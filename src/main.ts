/*global tempart_parser_parser, tempart_compiler_compiler, tempart_version, module, window */
import ConfigInterface from './Interface/Config';
import ComponentHandler from './Component/Handler';
import Config from './Core/Config';

class Main {
  _componentHandler: ComponentHandler
  _config: Config

  constructor(config: ConfigInterface) {
    this._setupConfig(config)
        ._createRootComponent();
  }

  _setupConfig(config: ConfigInterface): Main {
    this._config = new Config(config);
    return this;
  }

  _createRootComponent(): Main {
    this._componentHandler = new ComponentHandler(this._config);
    return this;
  }

  compileTemplate(): string {
    let mainComponent = this._componentHandler.create(this._config.getRootPath(), this._config.getRootArgs());
    var html = "";
    do{
      html = mainComponent._compileTemplate();
    } while(this._componentHandler._executeContainerInits())
    return html;
  }
}

(<any>window).Snew = Main;