export const mapLanguage = (lang) => {
  let mappedLanguage

  switch (lang) {
    case 'no':
      mappedLanguage = 'e81f617f-b767-4e7c-8495-93b745f47aa0'
      break
    case 'nb':
      mappedLanguage = '6c7b4d8d-c73b-48be-a60a-0b8803f71342'
      break
    case 'nn':
      mappedLanguage = 'e10cbbaf-bc4d-41cd-956c-e3cbed6008d4'
      break
    case 'sv':
      mappedLanguage = '034ada4b-fcb0-4039-9c3d-9edc6edc9db7'
      break
    case 'en':
      mappedLanguage = '2334fcce-865a-4f01-87da-255e5ffb5174'
      break
    case 'fi':
      mappedLanguage = '2443edca-1f54-4c41-abcb-ad448206e873'
      break
    case 'es':
      mappedLanguage = 'fe989d5b-136b-4632-9e28-f0901bf36bb6'
      break
    case 'dk':
      mappedLanguage = '0e859bea-cccd-46c5-a584-ef0e50b350ee'
      break
    default:
      mappedLanguage = 'e81f617f-b767-4e7c-8495-93b745f47aa0'
      break
  }

  return mappedLanguage
}
