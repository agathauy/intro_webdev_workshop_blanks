const React = require('react');

class Layout extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                    {/*For including semantic UI */}
                    <link rel="stylesheet" type="text/css" href="semantic/dist/semantic.min.css" />
                    <script
                    src="https://code.jquery.com/jquery-3.1.1.min.js"
                    integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
                    crossorigin="anonymous"></script>
                    <script src="semantic/dist/semantic.min.js"></script>
                    {/* Include own CSS */}
                    <link rel="stylesheet" type="text/css" href="/css/layout.css" />
                </head>
                <body>
                    <div id="layout">{this.props.children}</div>
                </body>
            </html>
        );
    }
}

module.exports = Layout;