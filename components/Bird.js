import React from 'react'
import Matter from 'matter-js'
import { View, Image } from 'react-native'


const Bird = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody /2
    const yBody = props.body.position.y - heightBody /2

    return(
        <View style={{
            // borderWidth: 1,
            // borderColor: color,
            // borderStyle: 'solid',
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody,
        }}>
            <Image 
                style={{width: 50, height: 50}}
                resizeMode='stretch'
                source={require('../assets/img/bird1.png')} />
        </View>
    )
}

export default (world, color, pos, size) => {
    const initialBird = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {label: 'Bird'}
    )
    Matter.World.add(world, initialBird)

    return {
        body: initialBird,
        color,
        pos,
        renderer: <Bird/>
    }
}
