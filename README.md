FormalizeIt
========

How to install
----------

To get started, download the plugin, unzip it and copy files to your website/application directory.
Load files before the tag `</body>` of your HTML document. Make sure you also add the jQuery library, Jquery.modalizeIt ( if you want to use the modal feature ) and the Jquery.validate plugin ( https://github.com/jzaefferer/jquery-validation ).

    <body>
        <script src="js/vendor/jquery.js"></script>
        <script src="js/plugins/jquery.validate.js"></script>
        <script src="js/plugins/jquery.modalizeIt.js"></script>
        <script src="js/plugins/jquery.formalizeIt.js"></script>
    </body>

How to use - without modal
----------

First, you need to create a container div at you HTML file:

    <body>
        <div id="default_form"></div>
    </body>

After that, you need to call the plugin at you javascript:
    ```<script type="text/javascript" charset="utf-8"> 
        $(document).ready(function() { 
            $('#default_form').formalizeIt({ 
                'token':'62bb61431348e22850828a5829c4373faafe29c1', 
                'secret':'51a266c2844ccd5cac83d88de88d82d05358aa51', 
                'modal':false, 
                'fields':{ 
                    'estado':['PR','SC','SP','RS'], 
                    'nivel':['Iniciante','Intermediário','Avançado','Ninja'] 
                } 
            });
        }); 
    </script>```

How to use - with modal
----------

First, you need to create a link tag at you HTML file:

    <body>
        <a id="integration_form" href="#">Click here to open your form</a>   
    </body>

After that, you need to call the plugin at you javascript:
    ```<script type="text/javascript" charset="utf-8"> 
        $(document).ready(function() { 
            $('#integration_form').formalizeIt({ 
                'token':'62bb61431348e22850828a5829c4373faafe29c1', 
                'secret':'51a266c2844ccd5cac83d88de88d82d05358aa51', 
                'modal':true, 
                'fields':{ 
                  'estado':['PR','SC','SP','RS'], 
                  'nivel':['Iniciante','Intermediário','Avançado','Ninja'] 
                } 
            });
        }); 
    </script>```

Good to know
----------

For default, formalizeIt create the fields email and name automagically.

Options
----------

- **modal(true/false)**: Set true, to use the modal version of the plugin.
- **fields(object)**: For select's, use key for the name of the select and an array of values for the options. For input text, use key as the name and pass the boolean true to create the field.
- **token(optional)**: Aggregates the token key to the data that will be send for the service.
- **secret(optional)**: Aggregates the secret key to the data that will be send for the service.

Contributing
----------

To contribute with the plugin, you will need Node.js installed in your machine.

Clone the repository and run `npm install`. After that, you just need to run `gulp watch` and have fun.