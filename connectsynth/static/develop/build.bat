python closure/bin/build/depswriter.py --root_with_prefix="synthjs  ../../synthjs" --output_file=deps.js
python closure/bin/build/closurebuilder.py -c compiler.jar -f "--compilation_level=ADVANCED_OPTIMIZATIONS" -n synthjs.application.OscillatorPlayer -o compiled --output_file=optimized_instrument_player.js --root=./ -f "--formatting=PRETTY_PRINT"
python closure/bin/build/closurebuilder.py -c compiler.jar -f "--compilation_level=ADVANCED_OPTIMIZATIONS" -n synthjs.application.OscillatorTestPlayer -o compiled --output_file=optimized_instrument_test_player.js --root=./ -f "--formatting=PRETTY_PRINT"