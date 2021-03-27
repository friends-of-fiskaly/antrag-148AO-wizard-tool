# antrag-148AO-wizard-tool
Simple wizard which gathers input information from user and sends a generated mail with the gathered data

### Integration of Antrag-148Ao react component
- Option 1: 
    - download 'Antrag-148Ao' component
    - `cd Antrag-148Ao`
    - `npm install`
    - create symbolic link in your react components folder to 'Antrag-148Ao'. 
    - inside your code: 
        - `import Antrag148AO from '../components/Antrag-148Ao/components/Antrag-148AO-form'`
        - add `<Antrag148AO />` component whereever you want it. 
        - change style of the component in `../components/Antrag-148Ao/styles/form.css`

- Option 2: 
    - copy the content of `Antrag-148Ao/components/` to your components folder
    - copy the content of `Antrag-148Ao/data/`, `Antrag-148Ao/utils/`, and possibly `Antrag-148Ao/styles/` to your `src` folder relative to `Antrag-148Ao/components/`.
    - install missing dependencies to your environment:
        - "@react-pdf/renderer": "^1.6.14",
        - "react": "^16.13.1",
        - "react-dom": "^16.13.1",
        - "react-images": "^1.1.0",
        - "react-native": "^0.64.0",
        - "react-pdf": "^5.2.0" 

### Local setup of webpage
- install node 
- run `npm install` in webpage subdirectory 
- run `gatsby develop` for local development environment
- view current status on `localhost:8000`


### Deploy webpage
- run `npm run deploy` (creates gh-pages branch and builds static version of webpage. site is published on github)

### TODO webpage
- improve colors and add fiskaly logo
- add React-Form Integration Tutorial