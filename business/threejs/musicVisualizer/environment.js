export const config = {
  corrections: {
    decibel: {
      pow: 40,
      denominator: 15
    },
    radius: 1.05,

  },
  position: {
    parallel_move: 7,
    multiply: 7
  },
  movement: {
    speed: 0.02
  }
}

export const static = {
  unit_direction: [1, -1],
  colors: [
    // 색상표 참조
    // https://www.rapidtables.org/ko/web/color/RGB_Color.html
    // https://colorswall.com/palette/102/
    // 빨(낮은 frequency) -> 보(높은 frequency)
    'rgb(128,0,0)', 'rgb(220,20,60)', 'rgb(233,150,122)', // 빨
    'rgb(255,69,0)', 'rgb(255,128,0)', 'rgb(255,215,0)', // 주
    'rgb(218,165,32)', 'rgb(255,255,0)', // 노
    'rgb(154,205,50)', 'rgb(127,255,0)', // 초
    'rgb(32,178,170)', 'rgb(30,144,255)', 'rgb(25,25,112)', // 파
    'rgb(138,43,226)', 'rgb(75,0,130)', // 남
    'rgb(238,130,238)', 'rgb(139,0,139)', 'rgb(128,0,128)' // 보
  ]
}
