function matrixScaling(matrix, size) {
    for (var i = 0; i < matrix.length; i++) {
        matrix[i] *= size
    }

    return matrix
}

function matrixTranslating(matrix, x, y, z) {
    for (var i = 0; i < matrix.length / 3; i++) {
        matrix[i * 3] += x
        matrix[i * 3 + 1] += y
        matrix[i * 3 + 2] += z
    }

    return matrix
}

function matrixRotating(matrix, derajatPutar, xCore, yCore) {
    degRad = derajatPutar * (Math.PI / 180)
    for (var i = 0; i < matrix.length / 3; i++) {
        var x = matrix[i * 3] - xCore
        var y = matrix[i * 3 + 2] - yCore
        matrix[i * 3] = Math.cos(degRad) * (x) - Math.sin(degRad) * (y) + xCore
        matrix[i * 3 + 2] = Math.sin(degRad) * (x) + Math.cos(degRad) * (y) + yCore
    }
    return matrix
}
