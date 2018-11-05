/** @babel */
/** @jsx etch.dom **/

import etch from 'etch'

export default class GuideView {
  constructor (props) {
    this.props = props
    this.didClickProjectButton = this.didClickProjectButton.bind(this)
    this.didClickNewFileButton = this.didClickNewFileButton.bind(this)
    etch.initialize(this)
  }

  update () {}

  render () {
    return (
      <div className='welcome is-guide'>
        <div className='welcome-container'>
          <section className='welcome-panel'>
            <h1 className='welcome-title'>
              ¡ Bienvenido a <span className='welcome-highlight'>Incre-IDLE</span> !
            </h1>

            <details className='welcome-card' {...this.getSectionProps('project')}>
              <summary className='welcome-summary icon icon-file-directory'>
                Abrir un <span className='welcome-highlight'>Archivo o Carpeta</span>
              </summary>
              <div className='welcome-detail'>
                <p>
                  <img className='welcome-img' src='atom://welcome/assets/project.svg' />
                </p>
                <p>
                  En Incre-IDLE podrás abrir archivos individuales o carpetas
                  con todos tus proyectos, los cuales serán visibles en la parte
                  lateral izquierda de tu pantalla.
                </p>
                <p>
                  <button ref='projectButton' onclick={this.didClickProjectButton} className='btn btn-primary'>
                    Abrir un Archivo o Carpeta
                  </button>
                </p>
                <p className='welcome-note'>
                  <strong>¡Por si no lo sabias!</strong> También puedes abrir tus archivos/carpetas
                  a través del menú superior del editor, ¡o arrastrando tus archivos a la aplicación!.
                </p>
              </div>
            </details>

            <details className='welcome-card' {...this.getSectionProps('newfile')}>
              <summary className='welcome-summary icon icon-file'>
                Crear un <span class='welcome-highlight'>Nuevo Archivo</span>
              </summary>
              <div className='welcome-detail'>
                <p>
                  <img className='welcome-img' src='atom://welcome/assets/code.svg' />
                </p>
                <p>
                  ¡Crea un nuevo archivo y comienza a programar!
                  <br/>
                  Una vez que el archivo tenga extensión <strong>'.c'</strong>,
                  podrás visualizar en el menú superior el botón para compilar
                  y ejecutar tu código.
                </p>
                <p>
                  <button onclick={this.didClickNewFileButton} className='btn btn-primary inline-block'>
                    Crear un Nuevo Archivo
                  </button>
                </p>
                <p className='welcome-note'>
                  <strong>¡Por si no lo sabias!</strong> También puedes crear archivos
                  a través del menú superior del editor.
                </p>
              </div>
            </details>

            <details className='welcome-card' {...this.getSectionProps('help')}>
              <summary className='welcome-summary icon icon-question'>
                ¿Necesitas <span class='welcome-highlight'>Ayuda</span>?
              </summary>
              <div className='welcome-detail'>
                <p>
                  Tranquila/o, podemos ayudarte en lo que necesites.
                </p>
                <p>
                  <a href="https://lambda.inf.ucv.cl/funprog/">
                    <button className='btn btn-primary inline-block'>
                      Ingresa al Sitio Web de ayuda
                    </button>
                  </a>
                </p>
                <p className='welcome-note'>
                  <strong>¿No encuentras la respuesta a tus dudas?</strong>
                  <br/>
                   Contáctate por correo electrónico con ayuda@incre-idle.cl
                  <br/>
                  Te intentaremos responder a la brevedad.
                </p>
              </div>
            </details>

            <details className='welcome-card' {...this.getSectionProps('website')}>
              <summary className='welcome-summary icon icon-globe'>
                Visita nuestro <span className='welcome-highlight'>Sitio Web</span>
              </summary>
              <div className='welcome-detail'>
                <p>
                  ¿Deseas conocer más acerca de este gran proyecto para aprender
                  programación?
                </p>
                <p>
                  <a href="https://lambda.inf.ucv.cl/funprog/">
                    <button className='btn btn-primary inline-block'>
                      Ingresa a nuestro Sitio Web
                    </button>
                  </a>
                </p>
              </div>
            </details>
          </section>
        </div>
      </div>
    )
  }

  getSectionProps (sectionName) {
    const props = {dataset: {section: sectionName}, onclick: this.didExpandOrCollapseSection}
    if (this.props.openSections && this.props.openSections.indexOf(sectionName) !== -1) {
      props.open = true
    }
    return props
  }

  getCommandPaletteKeyBinding () {
    if (process.platform === 'darwin') {
      return 'cmd-shift-p'
    } else {
      return 'ctrl-shift-p'
    }
  }

  getApplicationMenuName () {
    if (process.platform === 'darwin') {
      return 'Atom'
    } else if (process.platform === 'linux') {
      return 'Edit'
    } else {
      return 'File'
    }
  }

  serialize () {
    return {
      deserializer: this.constructor.name,
      openSections: this.getOpenSections(),
      uri: this.getURI()
    }
  }

  getURI () {
    return this.props.uri
  }

  getTitle () {
    return 'Guía de Bienvenida'
  }

  isEqual (other) {
    return other instanceof GuideView
  }

  getOpenSections () {
    return Array.from(this.element.querySelectorAll('details[open]'))
      .map((sectionElement) => sectionElement.dataset.section)
  }

  didClickProjectButton () {
    this.props.reporterProxy.sendEvent('clicked-project-cta')
    atom.commands.dispatch(atom.views.getView(atom.workspace), 'application:open')
  }

  didClickNewFileButton () {
    this.props.reporterProxy.sendEvent('clicked-newfile-cta')
    atom.commands.dispatch(atom.views.getView(atom.workspace), 'tree-view:increidle-add-file')
  }



  didExpandOrCollapseSection (event) {
    const sectionName = event.currentTarget.closest('details').dataset.section
    const action = event.currentTarget.hasAttribute('open') ? 'collapse' : 'expand'
    // this.props.reporterProxy.sendEvent(`${action}-${sectionName}-section`)
  }
}
