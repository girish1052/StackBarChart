var getScriptPromisify = (src) => {
    return new Promise(resolve => {
      $.getScript(src, resolve)
    })
  }
  
  (function () {

    //Chart Block in HTML
    const prepared = document.createElement('template')
    prepared.innerHTML = `
        <div id="root" style="width: 100%; height: 100%;">
        </div>
      `
    
    //Main JS Class holds methods to be called
    class SamplePrepared extends HTMLElement {
      constructor () {

        //call SAC DOM Super method to get shadow DOM information
        super()
        
        //Get shadow DOM informations
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(prepared.content.cloneNode(true))
        
        //Set HTML block in shadow DOM of SAC
        this._root = this._shadowRoot.getElementById('root')
  
        //_props object is used to hold properties information
        this._props = {}
        
        //Call render() method to plot chart
        this.render(this.resultSet)
      }
  
      //onCustomWidgetResize() method is execute whenever CW will resized in SAC.
      onCustomWidgetResize (width, height) {
        
        //Call render() method to plot chart
        this.render(this.resultSet)
      }
      
      //render() method to plot chart - resultSet1 holds data from SAC table/chart.
      async render (resultSet1) {
        await getScriptPromisify('https://code.highcharts.com/highcharts.js')


        const region = []
        const sales =[]
        const quntity = []
        var j = 0

        console.log(resultSet1)

        var len = resultSet1.length

        for(var i =0;i<len;i++)
        {
          if(i%2==0)
          {
          sales[j] = resultSet1[i]["@MeasureDimension"].rawValue
          region[j] = resultSet1[i].Region.description
          }
          else
          {
            quntity[j] = resultSet1[i]["@MeasureDimension"].rawValue
            j++
          }
        }

        Highcharts.chart('root', {

          title: {
              text: 'Solar Employment Growth by Sector, 2010-2016'
          },
      
          subtitle: {
              text: 'Source: thesolarfoundation.com'
          },
      
          yAxis: {
              title: {
                  text: 'Number of Employees'
              }
          },
      
          xAxis: {
              accessibility: {
                  rangeDescription: 'Range: 2010 to 2017'
              }
          },
      
          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle'
          },
      
          plotOptions: {
              series: {
                  label: {
                      connectorAllowed: false
                  },
                  pointStart: 2010
              }
          },
      
          series: [{
              name: 'Installation',
              data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
          }, {
              name: 'Manufacturing',
              data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
          }, {
              name: 'Sales & Distribution',
              data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
          }, {
              name: 'Project Development',
              data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
          }, {
              name: 'Other',
              data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
          }],
      
          responsive: {
              rules: [{
                  condition: {
                      maxWidth: 500
                  },
                  chartOptions: {
                      legend: {
                          layout: 'horizontal',
                          align: 'center',
                          verticalAlign: 'bottom'
                      }
                  }
              }]
          }
      
      });
  
      }
    }
  
    customElements.define('com-sap-sample-echarts-prepared', SamplePrepared)
  })()
