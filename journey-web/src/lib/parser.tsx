import React from "react"

type taggedArray = (string|JSX.Element|undefined)[]
type unflattenTaggedArray = (string|JSX.Element|undefined|taggedArray)[]

function parse (text: string): unflattenTaggedArray  {
    let taggedArray: taggedArray
    taggedArray = convertBoldTags(text)
    taggedArray = convertItalicTags(taggedArray)
    return taggedArray
}

function convertBoldTags(data: taggedArray|string) {
    let opening = "[@"
    let closing = "@]"
    let boldTag = (text:string, index: number) => (<b key={"bold" +index}>{text}</b>)
    if ( typeof data == 'string') {
        data = [data]
    }
    return generateTaggedArray(data, opening, closing, boldTag)
}

function convertItalicTags(data: taggedArray|string) {
    let opening = "[-"
    let closing = "-]"
    let italicTag = (text:string, index: number) => (<i key={"italic" +index}>{text}</i>)
    if ( typeof data == 'string') {
        data = [data]
    }
    return generateTaggedArray(data, opening, closing, italicTag)
}

function generateTaggedArray(
    taggedArray:unflattenTaggedArray,
    opening:string,
    closing:string,
    tagElement: (text:string, index: number) => JSX.Element
):taggedArray {
    let newTaggedArray:unflattenTaggedArray = taggedArray.map(item => {
        if (typeof item == 'string') {
            return generateTaggedArrayFromStr(item, opening, closing, tagElement)
        }
        return item
    })
    let flattenTagArray: taggedArray = []
    newTaggedArray.forEach(item => {
        if (Array.isArray(item)) {
            flattenTagArray = flattenTagArray.concat(item)
        }
        else {
            flattenTagArray.push(item)
        }
    })
    return flattenTagArray
}

function generateTaggedArrayFromStr(
    text:string,
    opening:string,
    closing:string,
    tagElement: (text:string, index: number) => JSX.Element
):taggedArray {
    let tagArray = []
    let byOpening = text.split(opening)
    tagArray.push(byOpening.shift())
    byOpening.forEach((item, index) => {
        let byClosing = item.split(closing)
        tagArray.push(tagElement(byClosing[0], index))
        tagArray.push(byClosing[1])
    })
    return tagArray
}

export { parse }
