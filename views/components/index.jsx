import React, {Component} from 'react'
import ReactDom from 'react-dom'
import Cropper from 'react-croppie'

export default class App extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            src: '',
            result: '',
            croppie: {
                viewport: { width: 200, height: 200, type: 'square' }
            }
        }
    }

    handleChange(e)
    {
        const file = e.target.files.item(0)
        if(!file) alert('not support file api')
        const reader = new FileReader()
        reader.onload = (event) => {
            const {result} = event.target
            this.setState({src: result})
        }

        reader.readAsDataURL(file)
    }

    getResult(options = {}){
        this.cropperBind()
        this.refs.reactCroppie.result().then( (url) => {
            this.setState({result: url})
        });
    }

    cropperBind()
    {
        console.log(this.refs.reactCroppie)
        const result = this.refs.reactCroppie._get()
        console.log(result)
        alert(result)
        // this.refs.reactCroppie._updateCenterPoint({
        //     url: this.state.src,
        //     point: result.point
        // })
        // this.refs.reactCroppie._currentZoom = (result.zoom)
    }

    handleUpdate(n)
    {
        console.log(n)
    }

    render()
    {
        const {src, result} = this.state

        return(
            <div>
                {
                    src != '' ?
                        <div style={{width:'300px'}}>
                            <strong>Cropper</strong><br/>
                            <Cropper
                                {...this.state.croppie}
                                url={src}
                                ref="reactCroppie"
                                update={(n) => this.handleUpdate(n)}
                            />
                            <button type="button" onClick={() => this.getResult()}>get result</button>
                        </div> :
                        null}
                {
                    result != '' ?
                        <div style={{width:'300px'}}>
                            <strong>result</strong><br/>
                            <img src={result} alt="crop result"/>
                        </div> :
                        null
                }
                <hr/>
                <div style={{display:'block'}}>
                    <input type="file" name="image" accept="image/*" onChange={this.handleChange.bind(this)} />
                </div>
            </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById('app'))