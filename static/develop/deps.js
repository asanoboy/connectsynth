// This file was autogenerated by static/develop/closurelibrary/closure/bin/build/depswriter.py.
// Please do not edit.
goog.addDependency('../../../synthjs/application/api/plugin.js', ['synthjs.application.api.Plugin'], ['goog.Uri']);
goog.addDependency('../../../synthjs/application/bareoscillator.js', ['synthjs.application.BareOscillator'], ['goog.dom', 'goog.events.EventHandler', 'synthjs.application.api.Plugin', 'synthjs.application.module.Oscillator', 'synthjs.application.module.OscillatorEventType']);
goog.addDependency('../../../synthjs/application/base.js', ['synthjs.application.Base'], ['synthjs.audiocore.Player', 'synthjs.ui.AjaxLoader', 'synthjs.ui.MenuAndBody', 'synthjs.ui.MenuBar', 'synthjs.utility.AjaxDeferred']);
goog.addDependency('../../../synthjs/application/module/oscillator.js', ['synthjs.application.module.Oscillator', 'synthjs.application.module.OscillatorEventType'], ['goog.events.EventTarget', 'goog.json', 'goog.ui.Dialog', 'goog.ui.Dialog.ButtonSet', 'goog.ui.Prompt', 'synthjs.audiocore.DynamicGenerator', 'synthjs.audiocore.MidiInterface', 'synthjs.audiocore.Note', 'synthjs.audiocore.Player', 'synthjs.audiocore.WavePlugin', 'synthjs.audiocore.WavePluginEventType', 'synthjs.model.Collection', 'synthjs.model.PluginControlParam', 'synthjs.model.PluginPreset', 'synthjs.model.PluginRadioParam', 'synthjs.model.PluginToggleParam', 'synthjs.ui.Keyboard', 'synthjs.ui.PluginControlPanel', 'synthjs.ui.PluginControlPanelContainer', 'synthjs.ui.VerticalKeyboardRenderer', 'synthjs.ui.window.Oscillator', 'synthjs.utility.AjaxDeferred', 'synthjs.utility.EventTarget']);
goog.addDependency('../../../synthjs/application/oscillatorplayer.js', ['synthjs.application.OscillatorPlayer'], ['goog.Uri', 'goog.dom', 'goog.events.EventHandler', 'goog.ui.Dialog', 'goog.ui.Dialog.ButtonSet', 'goog.ui.Dialog.DefaultButtonKeys', 'synthjs.application.Base', 'synthjs.application.api.Plugin', 'synthjs.application.module.Oscillator', 'synthjs.audiocore.DynamicGenerator', 'synthjs.audiocore.Note', 'synthjs.audiocore.WavePlugin', 'synthjs.ui.Keyboard', 'synthjs.ui.KeyboardEventType', 'synthjs.ui.Menu', 'synthjs.ui.MenuBar', 'synthjs.ui.SDKOscillator', 'synthjs.ui.VerticalKeyboardRenderer', 'synthjs.ui.window.Code', 'synthjs.ui.window.Image', 'synthjs.ui.window.Oscillator', 'synthjs.ui.window.WindowHolder', 'synthjs.utility.AjaxDeferred']);
goog.addDependency('../../../synthjs/application/publicoscillator.js', ['synthjs.application.PublicOscillator'], ['goog.string', 'synthjs.application.SDKOscillatorBase', 'synthjs.ui.Dialog', 'synthjs.ui.DirectoryControl', 'synthjs.utility.AjaxDeferred', 'synthjs.utility.TwitterUri']);
goog.addDependency('../../../synthjs/application/sdkoscillator.js', ['synthjs.application.SDKOscillator'], ['goog.ui.Dialog', 'goog.ui.Dialog.ButtonSet', 'goog.ui.Prompt', 'synthjs.application.OscillatorPlayer', 'synthjs.application.SDKOscillatorBase', 'synthjs.model.Collection', 'synthjs.model.FileSystem', 'synthjs.model.TextFile', 'synthjs.net.PluginPoster', 'synthjs.ui.DirectoryControl', 'synthjs.ui.TextPrompt', 'synthjs.utility.AjaxDeferred', 'synthjs.utility.BlobBuilder']);
goog.addDependency('../../../synthjs/application/sdkoscillatorbase.js', ['synthjs.application.SDKOscillatorBase'], ['synthjs.application.OscillatorPlayer', 'synthjs.model.Collection', 'synthjs.model.FileSystem', 'synthjs.model.TextFile']);
goog.addDependency('../../../synthjs/application/sequencer.js', ['synthjs.application.Sequencer'], ['synthjs.application.Base']);
goog.addDependency('../../../synthjs/audiocore/composer.js', ['synthjs.audiocore.Composer'], ['synthjs.audiocore.Performer', 'synthjs.audiocore.PerformerBase']);
goog.addDependency('../../../synthjs/audiocore/dynamicgenerator.js', ['synthjs.audiocore.DynamicGenerator'], ['goog.async.Deferred', 'goog.async.DeferredList', 'goog.debug.Logger', 'synthjs.audiocore.Generator', 'synthjs.audiocore.Note', 'synthjs.audiocore.Wave', 'synthjs.utility.Deferred', 'synthjs.utility.DeferredList']);
goog.addDependency('../../../synthjs/audiocore/filter.js', ['synthjs.audiocore.Filter'], []);
goog.addDependency('../../../synthjs/audiocore/filter_plugin.js', ['synthjs.audiocore.FilterPlugin'], ['synthjs.utility.WorkerDeferred']);
goog.addDependency('../../../synthjs/audiocore/generator.js', ['synthjs.audiocore.Generator'], ['synthjs.audiocore.Filter', 'synthjs.audiocore.FilterPlugin']);
goog.addDependency('../../../synthjs/audiocore/midiinterface.js', ['synthjs.audiocore.MidiInterface', 'synthjs.audiocore.MidiInterface.EventType'], ['goog.events.EventTarget']);
goog.addDependency('../../../synthjs/audiocore/note.js', ['synthjs.audiocore.Note'], ['goog.array']);
goog.addDependency('../../../synthjs/audiocore/performer.js', ['synthjs.audiocore.Performer'], ['synthjs.audiocore.DynamicGenerator', 'synthjs.audiocore.Generator', 'synthjs.audiocore.PerformerBase', 'synthjs.utility.Deferred', 'synthjs.utility.DeferredList']);
goog.addDependency('../../../synthjs/audiocore/performerbase.js', ['synthjs.audiocore.PerformerBase'], ['synthjs.utility.Deferred', 'synthjs.utility.DeferredList']);
goog.addDependency('../../../synthjs/audiocore/player.js', ['synthjs.audiocore.Player'], ['goog.events.EventTarget', 'goog.object', 'synthjs.audiocore.Generator']);
goog.addDependency('../../../synthjs/audiocore/wave.js', ['synthjs.audiocore.Wave'], ['goog.async.Deferred', 'goog.async.DeferredList']);
goog.addDependency('../../../synthjs/audiocore/wave_plugin.js', ['synthjs.audiocore.WaveEvent', 'synthjs.audiocore.WavePlugin', 'synthjs.audiocore.WavePluginEventType'], ['synthjs.utility.EventTarget', 'synthjs.utility.WorkerDeferredManager']);
goog.addDependency('../../../synthjs/bridge/codemirror.js', ['synthjs.CodeMirror'], []);
goog.addDependency('../../../synthjs/bridge/template.js', ['synthjs.Template'], ['goog.net.XhrIo', 'synthjs.utility.Deferred']);
goog.addDependency('../../../synthjs/encode/midifile.js', ['synthjs.encode.MidiFile', 'synthjs.encode.MidiParser'], ['goog.asserts']);
goog.addDependency('../../../synthjs/encode/utility.js', ['synthjs.encode.Utility'], ['goog.array']);
goog.addDependency('../../../synthjs/encode/wav.js', ['synthjs.encode.Wav'], []);
goog.addDependency('../../../synthjs/model/base.js', ['synthjs.model.Base'], ['goog.events.EventTarget', 'goog.object', 'synthjs.model.EventType']);
goog.addDependency('../../../synthjs/model/collection.js', ['synthjs.model.Collection', 'synthjs.model.Collection.EventType'], ['synthjs.utility.EventTarget']);
goog.addDependency('../../../synthjs/model/directory.js', ['synthjs.model.Directory'], ['synthjs.model.FileBase']);
goog.addDependency('../../../synthjs/model/eventtype.js', ['synthjs.model.EventType'], []);
goog.addDependency('../../../synthjs/model/filebase.js', ['synthjs.model.FileBase', 'synthjs.model.FileType'], ['synthjs.model.Base']);
goog.addDependency('../../../synthjs/model/filesystem.js', ['synthjs.model.FileSystem'], ['goog.events.EventHandler', 'goog.ui.Dialog', 'synthjs.model.Collection', 'synthjs.model.Directory', 'synthjs.model.FileBase']);
goog.addDependency('../../../synthjs/model/imagefile.js', ['synthjs.model.ImageFile'], ['goog.asserts', 'synthjs.model.FileBase', 'synthjs.model.FileType']);
goog.addDependency('../../../synthjs/model/midi.js', ['synthjs.model.Midi'], ['goog.asserts', 'synthjs.model.Base', 'synthjs.model.Collection', 'synthjs.model.MidiTrack']);
goog.addDependency('../../../synthjs/model/miditrack.js', ['synthjs.model.MidiEvent', 'synthjs.model.MidiTrack'], ['synthjs.model.Collection', 'synthjs.model.MidiTrack']);
goog.addDependency('../../../synthjs/model/plugincontrolparam.js', ['synthjs.model.PluginControlParam'], ['synthjs.model.Base']);
goog.addDependency('../../../synthjs/model/pluginparam.js', ['synthjs.model.PluginParam'], ['synthjs.model.Base']);
goog.addDependency('../../../synthjs/model/pluginpreset.js', ['synthjs.model.PluginPreset'], ['goog.json', 'synthjs.model.Base']);
goog.addDependency('../../../synthjs/model/pluginradioparam.js', ['synthjs.model.PluginRadioParam'], ['synthjs.model.Base']);
goog.addDependency('../../../synthjs/model/plugintoggleparam.js', ['synthjs.model.PluginToggleParam'], ['synthjs.model.Base']);
goog.addDependency('../../../synthjs/model/textfile.js', ['synthjs.model.TextFile'], ['synthjs.model.FileBase', 'synthjs.model.FileType']);
goog.addDependency('../../../synthjs/net/pluginposter.js', ['synthjs.net.PluginPoster'], ['goog.array', 'synthjs.utility.AjaxDeferred']);
goog.addDependency('../../../synthjs/net/xhrio.js', ['synthjs.net.XhrIo'], ['goog.net.XhrIo']);
goog.addDependency('../../../synthjs/ui/ajaxdialog.js', ['synthjs.ui.AjaxDialog'], ['goog.ui.Dialog', 'goog.ui.Dialog.ButtonSet', 'synthjs.utility.AjaxDeferred']);
goog.addDependency('../../../synthjs/ui/ajaxloader.js', ['synthjs.ui.AjaxLoader'], ['goog.ui.ModalPopup']);
goog.addDependency('../../../synthjs/ui/dialog.js', ['synthjs.ui.Dialog'], ['goog.ui.Dialog']);
goog.addDependency('../../../synthjs/ui/directorycontrol.js', ['synthjs.ui.DirectoryControl', 'synthjs.ui.DirectoryControl.EventType'], ['goog.asserts', 'goog.events.FileDropHandler', 'goog.events.FileDropHandler.EventType', 'goog.fs.FileReader', 'goog.fs.FileReader.EventType', 'goog.object', 'goog.ui.Component.EventType', 'goog.ui.MenuItem', 'goog.ui.PopupMenu', 'goog.ui.tree.TreeControl', 'synthjs.model.FileBase', 'synthjs.model.ImageFile', 'synthjs.ui.DirectoryNodeType']);
goog.addDependency('../../../synthjs/ui/directorynode.js', ['synthjs.ui.DirectoryNode', 'synthjs.ui.DirectoryNode.EventType', 'synthjs.ui.DirectoryNodeType'], ['goog.events.BrowserEvent.MouseButton', 'goog.events.EventHandler', 'goog.events.EventType', 'goog.events.KeyHandler', 'goog.string', 'goog.ui.Component.EventType', 'goog.ui.Menu.EventType', 'goog.ui.MenuItem', 'goog.ui.PopupMenu', 'goog.ui.Prompt', 'goog.ui.tree.TreeNode', 'synthjs.model.EventType']);
goog.addDependency('../../../synthjs/ui/graphics/controlbutton.js', ['synthjs.ui.graphics.ControlButton'], ['goog.graphics.ext', 'goog.string.format', 'synthjs.ui.graphics.GraphicsComponent']);
goog.addDependency('../../../synthjs/ui/graphics/graphicscomponent.js', ['synthjs.ui.graphics.GraphicsComponent'], ['synthjs.utility.EventTarget']);
goog.addDependency('../../../synthjs/ui/graphics/radiobutton.js', ['synthjs.ui.graphics.RadioButton'], ['goog.graphics.ext', 'synthjs.ui.graphics.GraphicsComponent']);
goog.addDependency('../../../synthjs/ui/graphics/togglebutton.js', ['synthjs.ui.graphics.ToggleButton'], ['goog.graphics.ext', 'synthjs.ui.graphics.GraphicsComponent']);
goog.addDependency('../../../synthjs/ui/keyboard.js', ['synthjs.ui.Keyboard', 'synthjs.ui.KeyboardEventType'], ['goog.dom.classes', 'goog.events.BrowserEvent.MouseButton', 'goog.events.EventHandler', 'goog.events.EventType', 'goog.ui.Component', 'synthjs.audiocore.Note', 'synthjs.ui.VerticalKeyboardRenderer']);
goog.addDependency('../../../synthjs/ui/menu.js', ['synthjs.ui.Menu'], ['goog.ui.Menu', 'goog.ui.MenuButton', 'goog.ui.MenuItem', 'goog.ui.MenuSeparator']);
goog.addDependency('../../../synthjs/ui/menuandbody.js', ['synthjs.ui.MenuAndBody'], ['goog.dom.ViewportSizeMonitor', 'goog.math.Size', 'goog.ui.Component']);
goog.addDependency('../../../synthjs/ui/menubar.js', ['synthjs.ui.MenuBar'], ['goog.array', 'goog.events.EventHandler', 'goog.events.EventType', 'goog.object', 'goog.ui.Component', 'goog.ui.Menu', 'goog.ui.MenuButton', 'goog.ui.MenuItem', 'goog.ui.MenuSeparator', 'goog.ui.menuBar', 'synthjs.ui.Menu']);
goog.addDependency('../../../synthjs/ui/plugincontrolpanel.js', ['synthjs.ui.PluginControlPanel', 'synthjs.ui.PluginControlPanelEventType'], ['goog.graphics', 'goog.ui.Component', 'synthjs.ui.graphics.ControlButton', 'synthjs.ui.graphics.RadioButton', 'synthjs.ui.graphics.ToggleButton']);
goog.addDependency('../../../synthjs/ui/plugincontrolpanelcontainer.js', ['synthjs.ui.PluginControlPanelContainer'], ['goog.ui.ComboBox', 'goog.ui.ComboBoxItem', 'goog.ui.Component', 'synthjs.ui.PluginControlPanel']);
goog.addDependency('../../../synthjs/ui/sdkoscillator.js', ['synthjs.ui.SDKOscillator'], ['goog.dom.ViewportSizeMonitor', 'goog.events.EventHandler', 'goog.events.EventType', 'goog.math.Size', 'goog.object', 'goog.style', 'goog.ui.Component', 'goog.ui.SplitPane.Orientation', 'synthjs.ui.SplitPane']);
goog.addDependency('../../../synthjs/ui/splitpane.js', ['synthjs.ui.SplitPane'], ['goog.style', 'goog.ui.SplitPane']);
goog.addDependency('../../../synthjs/ui/textprompt.js', ['synthjs.ui.TextPrompt'], ['goog.ui.Prompt']);
goog.addDependency('../../../synthjs/ui/verticalkeyboardrenderer.js', ['synthjs.ui.VerticalKeyboardRenderer'], ['goog.dom.classes', 'goog.style']);
goog.addDependency('../../../synthjs/ui/window/base.js', ['synthjs.ui.window.Base', 'synthjs.ui.window.EventType'], ['goog.events.EventHandler', 'goog.ui.Component']);
goog.addDependency('../../../synthjs/ui/window/code.js', ['synthjs.ui.window.Code'], ['goog.dom', 'synthjs.CodeMirror', 'synthjs.model.FileBase', 'synthjs.ui.window.EventType', 'synthjs.ui.window.FileBase']);
goog.addDependency('../../../synthjs/ui/window/filebase.js', ['synthjs.ui.window.FileBase'], []);
goog.addDependency('../../../synthjs/ui/window/image.js', ['synthjs.ui.window.Image'], ['goog.dom', 'synthjs.model.FileBase', 'synthjs.ui.window.EventType', 'synthjs.ui.window.FileBase']);
goog.addDependency('../../../synthjs/ui/window/oscillator.js', ['synthjs.ui.window.Oscillator'], ['goog.style', 'synthjs.ui.Keyboard', 'synthjs.ui.VerticalKeyboardRenderer', 'synthjs.ui.window.Base', 'synthjs.ui.window.EventType']);
goog.addDependency('../../../synthjs/ui/window/windowholder.js', ['synthjs.ui.window.WindowHolder'], ['goog.dom', 'goog.ui.Component', 'synthjs.ui.window.WindowSection']);
goog.addDependency('../../../synthjs/ui/window/windowsection.js', ['synthjs.ui.window.WindowSection'], ['goog.array', 'goog.dom', 'goog.dom.classes', 'goog.dom.query', 'goog.events.EventHandler', 'goog.events.EventType', 'goog.math.Size', 'goog.object', 'goog.style', 'goog.ui.Component', 'synthjs.ui.window.EventType']);
goog.addDependency('../../../synthjs/utility/ajaxdeferred.js', ['synthjs.utility.AjaxDeferred'], ['goog.events.EventHandler', 'goog.net.EventType', 'synthjs.net.XhrIo', 'synthjs.utility.Deferred']);
goog.addDependency('../../../synthjs/utility/blobbuilder.js', ['synthjs.utility.BlobBuilder'], []);
goog.addDependency('../../../synthjs/utility/deferred.js', ['synthjs.utility.Deferred'], ['goog.async.Deferred']);
goog.addDependency('../../../synthjs/utility/deferredlist.js', ['synthjs.utility.DeferredList'], ['goog.array', 'synthjs.utility.Deferred']);
goog.addDependency('../../../synthjs/utility/eventtarget.js', ['synthjs.utility.EventTarget'], ['goog.events.EventHandler', 'goog.events.EventTarget']);
goog.addDependency('../../../synthjs/utility/twitteruri.js', ['synthjs.utility.TwitterUri'], []);
goog.addDependency('../../../synthjs/utility/uuid.js', ['synthjs.utility.UUID'], []);
goog.addDependency('../../../synthjs/utility/worker_deferred.js', ['synthjs.utility.WorkerDeferred'], ['synthjs.utility.Deferred']);
goog.addDependency('../../../synthjs/utility/worker_deferred_manager.js', ['synthjs.utility.WorkerDeferredManager'], ['synthjs.utility.Deferred', 'synthjs.utility.UUID']);
