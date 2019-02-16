var LazySolution = new function () {

    var version = "1.0";

    //JQuery Ajax Setting
    this.AjaxSetting = new function () {
        //Return Multipart/Form-Data Ajax Setting
        this.Multipart = function (parameters) {
            var url = parameters["url"];
            var data = parameters["data"];
            var headers = parameters["headers"];
            var success = parameters["success"];
            var error = parameters["error"];

            var ajaxSetting;
            ajaxSetting = {
                url: url,
                type: "POST",
                data: data,
                headers: headers,
                processData: false,
                contentType: false,
                success: success,
                error: error
            };
            return ajaxSetting;
        };

        this.Json = function (parameters) {
            var url = parameters["url"];
            var type = parameters["type"];
            var cache = parameters["cache"];
            var data = parameters["data"];
            var headers = parameters["headers"];
            var success = parameters["success"];
            var error = parameters["error"];
            var complete = parameters["complete"];
            var ajaxSetting;
            ajaxSetting = {
                url: url,
                type: type,
                cache: cache,
                contentType: "application/json",
                data: JSON.stringify(data),
                headers: headers,
                success: success,
                error: error,
                complete: complete
            };
            return ajaxSetting;
        };
    };

    //Bootstrap 4 Component
    //Display Alert in Container Initialized
    this.Alert = new function () {
        var Initialize = function (message, container, type) {
            //Default container id: divAlert
            var alertContainer = (container) ? container : $("#divAlert");
            //Create HTML content
            var alertContent = "<div class=\"alert alert-" + type + " alert-dismissible fade show\" role=\"alert\">" +
                message +
                "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
                "<span aria-hidden=\"true\">&times;</span>" +
                "</button>" +
                "</div>";
            alertContainer.html(alertContent);
        };
        this.Primary = function (message, container) {
            return Initialize(message, container, "primary");
        };
        this.Secondary = function (message, container) {
            return Initialize(message, container, "secondary");
        };
        this.Success = function (message, container) {
            return Initialize(message, container, "success");
        };
        this.Danger = function (message, container) {
            return Initialize(message, container, "danger");
        };
        this.Warning = function (message, container) {
            return Initialize(message, container, "warning");
        };
        this.Info = function (message, container) {
            return Initialize(message, container, "info");
        };
        this.Light = function (message, container) {
            return Initialize(message, container, "light");
        };
        this.Dark = function (message, container) {
            return Initialize(message, container, "dark");
        };
    };

    //Data Helper Features
    this.Data = new function () {
        //Convert Form Data into JSON Object
        this.FormToJson = function (form) {
            var array = form.serializeArray();
            var data = {};

            //Convert array into JSON object
            $.each(array, function () {
                if (data[this.name]) {
                    //Duplicate key for multiple input control
                    if ($.isArray(data[this.name])) {
                        //Key already is array - push value into array
                        data[this.name].push(this.value);
                    }
                    else {
                        //Key not array - Convert key into array and push value into array
                        data[this.name] = new Array(data[this.name]);
                        data[this.name].push(this.value);
                    }
                }
                else {
                    //Create new key for JSON object
                    data[this.name] = this.value;
                }
            });

            return data;
        };

        //Convert JSON into Form
        //Control Include: input (include radio and checkbox), select, div, label
        this.JsonToForm = function (form, data) {
            $.each(data, function (key, value) {
                //Search elements with name attribute
                var elements = form.find("[name=" + key + "]");
                $.each(elements, function () {
                    //Kendo widget
                    var widget = kendo.widgetInstance($(this));
                    if (widget) {
                        //Set value for kendo widget
                        widget.value(value);
                    }
                    //HTML widget
                    else {
                        //<input>, <textarea> and <select>
                        if (this.nodeName === "SELECT" || this.nodeName === "INPUT" || this.nodeName === "TEXTAREA") {
                            //Radio button and checkbox
                            if (this.type === "radio" || this.type === "checkbox") {
                                if ($.isArray(value)) {
                                    //Convert value into both integer and string data type
                                    var intInArray = ($.isNumeric(this.value)) ? $.inArray(parseInt(this.value), value) : -1;
                                    var stringInArray = $.inArray(this.value, value);
                                    if (intInArray > -1 || stringInArray > -1) {
                                        //Value exist in array
                                        $(this).prop("checked", true);
                                    }
                                }
                                else {
                                    //Condition with necessary type conversion
                                    if (this.value == value) {
                                        $(this).prop("checked", true);
                                    }
                                }
                            }
                            //Other input type
                            else {
                                $(this).val(value);
                            }
                        }
                        //Other HTML tag with name attribute
                        else {
                            $(this).html(value.toString());
                        }
                    }
                });
            });
        };
    };

    //Kendo UI - JQuery Component
    this.Dialog = new function () {
        this.Ok = function (parameters) {
            //Initial Variable
            var title = parameters["title"];
            var content = parameters["content"];
            var ok = parameters["ok"];

            //Create ID For Dialog 
            var uniqueID = "Lazy_Dialog_Ok";
            var containerID = "[lazy-id=" + uniqueID + "]";

            //If <div> do not exist
            if (!$(containerID).length) {
                //Create <div> For Dialog
                var strHtml = "<div lazy-id=\"" + uniqueID + "\"></div>";
                $("body").append(strHtml);

                //Dialog Close 
                var onClose = function (e) {
                    //Destroy Dialog
                    if ($(containerID).length) {
                        $(containerID).data("kendoDialog").destroy();
                    }
                };

                //Create Kendo Dialog
                $(containerID).kendoDialog({
                    title: title,
                    content: content,
                    close: onClose,
                    closable: false,
                    modal: true,
                    actions: [
                        { text: "Ok", action: ok, primary: true }
                    ]
                });
            }
        };
        this.OkCancel = function (parameters) {
            //Initial Variable
            var title = parameters["title"];
            var content = parameters["content"];
            var ok = parameters["ok"];
            var cancel = parameters["cancel"];

            //Create ID For Dialog 
            var uniqueID = "Lazy_Dialog_OkCancel";
            var containerID = "[lazy-id=" + uniqueID + "]";

            //If <div> do not exist
            if (!$(containerID).length) {
                //Create <div> For Dialog
                var strHtml = "<div lazy-id=\"" + uniqueID + "\"></div>";
                $("body").append(strHtml);

                //Dialog Close 
                var onClose = function (e) {
                    //Destroy Dialog
                    if ($(containerID).length) {
                        $(containerID).data("kendoDialog").destroy();
                    }
                };

                //Create Kendo Dialog
                $(containerID).kendoDialog({
                    title: title,
                    content: content,
                    close: onClose,
                    closable: false,
                    modal: true,
                    actions: [
                        { text: "Ok", action: ok, primary: true },
                        { text: "Cancel", action: cancel }
                    ]
                });
            }
        };
    };

    //Get Library Current Version
    this.GetVersion = function () {
        return version;
    };

    //Get Querystring From URL Become Json Object
    //Exmaple: var value = GetQueryString()["name"]
    this.GetQueryString = function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split("=");
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    };

    //Kendo UI - JQuery Component
    this.PopupNotification = new function () {
        //Generate Kendo Popup Notification Widget
        var Initialize = function () {
            var uniqueID = "Lazy_Popup_Notification";
            var containerID = "[lazy-id=" + uniqueID + "]";

            if (!$(containerID).length) {
                //Create <div> for popup notification
                var strHtml = "<span lazy-id=\"" + uniqueID + "\"></span>";
                $("body").append(strHtml);
            }
            return $(containerID).kendoNotification().data("kendoNotification");
        };
        //Notification types
        this.Info = function (message) {
            var notification = Initialize();
            notification.show(message, "info");
        };
        this.Success = function (message) {
            var notification = Initialize();
            notification.show(message, "success");
        };
        this.Warning = function (message) {
            var notification = Initialize();
            notification.show(message, "warning");
        };
        this.Error = function (message) {
            var notification = Initialize();
            notification.show(message, "error");
        };
    };
};

