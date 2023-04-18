import React from 'react';
import ReactDOM from 'react-dom/client';


enum ParamType {
  STRING = 'string',
  NUMBER = 'number',
  ELEFANT = 'elefant'
}

interface Param {
  id: number;
  name: string;
  type?: ParamType.STRING;
}
  
interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

type FullParam = Param & ParamValue

interface State {
  fullparams: FullParam[]
}

class ParamEditor extends React.Component<Props, State> {
  state: State = {
    fullparams: [],
  }

  public getModel(): Model {
    console.log(this.transformStateToModel())
    return this.transformStateToModel()
  }

  componentDidMount(): void {
    this.setFullParams();
  }

  private setFullParams(): void {
    const props = this.props

    const result = props.params.map((param, i) => ({
      ...param,
      ...props.model.paramValues[i]
    }))

    this.setState((prev) => ({...prev, fullparams: result}))
  }

  private onInputHadler(e: React.FormEvent<HTMLInputElement>) {
    const curValue = e.currentTarget.value
    const id = parseInt(e.currentTarget.id)

    const updatedParams = this.state.fullparams.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          value: curValue
        }
      }
      return el
    })

    this.setState(prev => ({...prev, fullparams: updatedParams}))
  }

  private transformStateToModel(): Model {
    return {
      colors: [],
      paramValues: [
        ...this.state.fullparams.map((el) => ({paramId: el.paramId, value: el.value }))
      ]
    }
  }


  private onButtonClickHandler() {
    this.getModel();
  }

  render(): React.ReactNode {
    return (
      <>
        {this.state.fullparams.map((param) => {
          return <div key={param.id}>
            <span>{param.name}</span><input type='text' value={param.value} onInput={(e) => this.onInputHadler(e)} id={`${param.id}`} />
          </div>
        })}

        <button onClick={() => this.onButtonClickHandler()}>getModel</button>
      </>
    )
  }
}

const model: Model = {
  "paramValues": [
    {
    "paramId": 1,
    "value": "повседневное"
    },
    {
    "paramId": 2,
    "value": "макси"
    }
  ],
  
  colors: [],
}

const params: Param[] = [
  {
    "id": 1,
    "name": "Назначение",
  },
  {
    "id": 2,
    "name": "Длина"
  },
]

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ParamEditor model={model} params={params}  />
  </React.StrictMode>
);