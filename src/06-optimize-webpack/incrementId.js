const incrementId = (start = 0, onNext = undefined) => {
  let current = start

  const nextId = () => {
    current += 1
    if (typeof onNext === 'function') {
      onNext(current)
    }
    return current
  }

  return nextId
}

export default incrementId
