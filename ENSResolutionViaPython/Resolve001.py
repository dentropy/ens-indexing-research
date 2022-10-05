from ens import ens

domain = ens.name('0x5b2063246f2191f18f2675cedb8b28102e957458')


# name() also accepts the bytes version of the address

assert ens.name(b'[ c$o!\x91\xf1\x8f&u\xce\xdb\x8b(\x10.\x95tX') == domain


# confirm that the name resolves back to the address that you looked up:

assert ens.address(domain) == '0x5b2063246f2191f18f2675cedb8b28102e957458'
