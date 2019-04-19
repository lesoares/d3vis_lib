'use strict';


var myApp = {};


myApp.xScale = undefined;
myApp.yScale = undefined;
myApp.xAxis  = undefined;
myApp.yAxis  = undefined;

myApp.appendSvg = function(div, dimensoes, margens)
{
    var node = d3.select(div).append('svg')
        .attr('width', dimensoes.largura + margens.left + margens.right)
        .attr('height', dimensoes.altura + margens.top + margens.bottom);
    
    return node;
}

myApp.appendChartGroup = function(svg, dimensoes, margens)
{
    var chart = svg.append('g')
        .attr('width', dimensoes.largura)
        .attr('height', dimensoes.altura)
        .attr('transform', 'translate('+ margens.left +','+ margens.top +')' );
    
    return chart;
}

myApp.createAxes = function(svg, dimensoes, margens, dados, eixos)
{
    myApp.xScale = d3.scaleLinear().domain([0,1]).range([0,dimensoes.largura]);
    myApp.yScale = d3.scaleLinear().domain([0,1]).range([0,dimensoes.altura]);
    
    if(eixos){
    var xAxisGroup = svg.append('g')
        .attr('class', 'xAxis')
        .attr('transform', 'translate('+ margens.left +','+ (dimensoes.altura + margens.top) +')');

    var yAxisGroup = svg.append('g')
        .attr('class', 'yAxis')
        .attr('transform', 'translate('+ margens.left +','+ margens.top +')');
    
    myApp.xAxis = d3.axisBottom(myApp.xScale);
    myApp.yAxis = d3.axisLeft(myApp.yScale);
    
    xAxisGroup.call(myApp.xAxis)   

    yAxisGroup.call(myApp.yAxis).append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")   
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .text("Eixo Y");
    }
}

myApp.appendCircles = function(div, i, dado)
{
    //var arr = myApp.createCirclesData(100);        
    
    var circle = div.selectAll('dataset'+i)
        .data(dado.dataset)
        .enter()
        .append('circle')
        .attr('cx', function(d){ return myApp.xScale(d.cx); })
        .attr('cy', function(d){ return myApp.yScale(d.cy); })
        .attr('r' , function(d){ return d.r || 3.0; });


    return circle;
}

myApp.appendDataId = function (div) {
    
    div.selectAll("circle")
    .append("text")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("x", function(d){ return myApp.xScale(d.cx)+d.r + 10; })
    .attr("y", function(d){ return myApp.yScale(d.cy)+d.r + 10; })
    .text(d => d.label);
}

myApp.randomColor = function()
{
    return 'rgb(' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ')';
}

myApp.brush = function(div, brushFuncao) {
    div.call( d3.brush().on("start brush", brushFuncao) );
    
}

myApp.run = function(parametros) 
{        
    var svg = myApp.appendSvg(parametros.div, parametros.dimensoes, parametros.margens);
    var cht = myApp.appendChartGroup(svg, parametros.dimensoes, parametros.margens); 
    myApp.createAxes(svg, parametros.dimensoes, parametros.margens, parametros.eixos);
    
    var arrayDados = parametros.dados;
    arrayDados.forEach(function (dado) {
        var sel1 = myApp.appendCircles(cht, 1, dado);
        sel1.style('fill', dado.cor);
        myApp.brush(cht, parametros.brush.funcao);
    });


}



var data1 = [{'cx': 0.36, 'cy': 0.33, 'r': 0.93},
{'cx': 0.62, 'cy': 0.27, 'r': 5},
{'cx': 0.99, 'cy': 0.32, 'r': 5},
{'cx': 0.21, 'cy': 0.55, 'r': 5},
{'cx': 0.81, 'cy': 0.69, 'r': 5},
{'cx': 0.57, 'cy': 0.15, 'r': 5},
{'cx': 0.77, 'cy': 0.20, 'r': 5},
{'cx': 0.87, 'cy': 0.18, 'r': 5},
{'cx': 0.63, 'cy': 0.88, 'r': 5},
{'cx': 0.63, 'cy': 0.64, 'r': 5}];


var data2 = [
  {'cx': 0.36, 'cy': 0.03, 'r': 3.5, 'label': 'ABAB'},
  {'cx': 0.49, 'cy': 0.47, 'r': 3.5, 'label': 'ABAB'},
  {'cx': 0.20, 'cy': 0.03, 'r': 3.5, 'label': 'ABAB'},
  {'cx': 0.95, 'cy': 0.42, 'r': 3.5, 'label': 'ABAB'},
  {'cx': 0.70, 'cy': 0.01, 'r': 3.5, 'label': 'ABAB'},
  {'cx': 0.81, 'cy': 0.05, 'r': 3.5, 'label': 'ABAB'},
  {'cx': 0.59, 'cy': 0.25, 'r': 3.5, 'label': 'ABAB'},
  {'cx': 0.15, 'cy': 0.89, 'r': 3.5, 'label': 'ABAB'},
  {'cx': 0.26, 'cy': 0.23, 'r': 3.5, 'label': 'ABAB'},
  {'cx': 0.48, 'cy': 0.53, 'r': 3.5, 'label': 'ABAB'}

];




var parametros = {
    div: "#mainDiv",
    margens: {
        top: 10,
        left: 25,
        bottom: 30,
        right: 15
    },
    dimensoes: {
        altura: 600,
        largura: 600
    },
    eixos: {
        ticks: {x: '', y: ''},
        legenda: {x: 'Eixo X', y: 'Eixo Y'},
    },
    zoom: true,
    brush: {
        funcao: function(d) {  }
    },
    dados: [{
        dataset: data2,
        label: function(d) { return d.label},
        cor: 'blue',
        raio: 3.5
    },
    {
        dataset: data1,
        raio: 5,
        label: function(d) { return d.label},
        cor: 'green'
    }
]

};

window.onload = function() {
    myApp.run(parametros); 
};

