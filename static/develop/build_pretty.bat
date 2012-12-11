python closure/bin/build/depswriter.py --root_with_prefix="synthjs  ../../synthjs" --output_file=deps.js
python closure/bin/build/closurebuilder.py -c compiler.jar -f "--compilation_level=ADVANCED_OPTIMIZATIONS" -n synthjs.application.PublicOscillator -o compiled --output_file=../js/optimized_instrument_player.js --root=./ -f "--formatting=PRETTY_PRINT" -f "--externs" -f "extern.js"
python closure/bin/build/closurebuilder.py -c compiler.jar -f "--compilation_level=ADVANCED_OPTIMIZATIONS" -n synthjs.application.SDKOscillator -o compiled --output_file=../js/optimized_instrument_sdk.js --root=./ -f "--formatting=PRETTY_PRINT" -f "--externs" -f "extern.js"
python closure/bin/build/closurebuilder.py -c compiler.jar -f "--compilation_level=ADVANCED_OPTIMIZATIONS" -n synthjs.application.BareOscillator -o compiled --output_file=../js/optimized_bare_instrument_player.js --root=./ -f "--formatting=PRETTY_PRINT" -f "--externs" -f "extern.js"